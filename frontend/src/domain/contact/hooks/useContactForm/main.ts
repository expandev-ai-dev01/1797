import { useState, useCallback, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { contactService } from '../../services';
import { toast } from '@/core/hooks/use-toast';
import type { ContactFormData } from '../../types';

const initialFormData: ContactFormData = {
  nome_completo: '',
  email: '',
  telefone: '',
  preferencia_contato: '',
  melhor_horario: 'Qualquer horário',
  id_veiculo: '',
  assunto: '',
  mensagem: '',
  financiamento: false,
  termos_privacidade: false,
  receber_novidades: false,
};

type FormErrors = Partial<Record<keyof ContactFormData, string>>;

/**
 * @hook useContactForm
 * @summary Manages the state, validation, and submission of the vehicle contact form.
 * @domain contact
 * @type domain-hook
 * @category form
 */
export const useContactForm = (carId: string) => {
  const [formData, setFormData] = useState<ContactFormData>({
    ...initialFormData,
    id_veiculo: carId,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const contactMutation = useMutation({
    mutationFn: contactService.createContact,
    onSuccess: (response) => {
      toast({
        title: 'Contato enviado com sucesso!',
        description: `Seu número de protocolo é: ${response.data.protocolo}`,
      });
      setFormData({ ...initialFormData, id_veiculo: carId });
      setErrors({});
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.';
      toast({
        title: 'Erro no envio',
        description: errorMessage,
        variant: 'destructive',
      });
    },
  });

  const validate = useCallback(() => {
    const newErrors: FormErrors = {};
    if (formData.nome_completo.trim().length < 3)
      newErrors.nome_completo = 'O nome deve conter pelo menos 3 caracteres.';
    if (formData.nome_completo.trim().split(' ').length < 2)
      newErrors.nome_completo = 'Por favor, informe seu nome completo (nome e sobrenome).';
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Por favor, informe um endereço de e-mail válido.';
    if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.telefone))
      newErrors.telefone = 'Formato de telefone inválido. Use (XX) XXXXX-XXXX.';
    if (!formData.preferencia_contato)
      newErrors.preferencia_contato = 'Por favor, selecione sua preferência de contato.';
    if (!formData.assunto) newErrors.assunto = 'Por favor, selecione o assunto da sua consulta.';
    if (formData.mensagem.trim().length < 10)
      newErrors.mensagem = 'A mensagem deve conter no mínimo 10 caracteres.';
    if (!formData.termos_privacidade)
      newErrors.termos_privacidade = 'É necessário concordar com os termos de privacidade.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      contactMutation.mutate({
        ...formData,
        termos_privacidade: true,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({ ...prev, [name]: isCheckbox ? checked : value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (name: keyof ContactFormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    value = value.replace(/(\d)(\d{4})$/, '$1-$2');
    e.target.value = value;
    handleInputChange(e);
  };

  useEffect(() => {
    if (formData.assunto === 'Financiamento') {
      setFormData((prev) => ({ ...prev, financiamento: true }));
    }
  }, [formData.assunto]);

  return {
    formData,
    errors,
    handleSubmit,
    handleInputChange,
    handleSelectChange,
    handlePhoneChange,
    setFormData,
    isLoading: contactMutation.isPending,
  };
};
