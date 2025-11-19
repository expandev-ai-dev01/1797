import { useContactForm } from '../../hooks';
import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import { Label } from '@/core/components/ui/label';
import { Textarea } from '@/core/components/ui/textarea';
import { Checkbox } from '@/core/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/core/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/select';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/core/components/ui/card';
import type { ContactFormProps } from './types';

/**
 * @component ContactForm
 * @summary Form for users to express interest in a vehicle.
 * @domain contact
 * @type domain-component
 * @category form
 */
export function ContactForm({ carId, carModelTitle }: ContactFormProps) {
  const {
    formData,
    errors,
    handleSubmit,
    handleInputChange,
    handleSelectChange,
    handlePhoneChange,
    isLoading,
    setFormData,
  } = useContactForm(carId);

  const FieldError = ({ name }: { name: keyof typeof errors }) =>
    errors[name] ? <p className="text-sm text-destructive mt-1">{errors[name]}</p> : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Tenho Interesse</CardTitle>
        <CardDescription>
          Preencha o formulário abaixo para entrarmos em contato sobre o veículo {carModelTitle}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nome_completo">Nome Completo *</Label>
              <Input
                id="nome_completo"
                name="nome_completo"
                value={formData.nome_completo}
                onChange={handleInputChange}
                required
              />
              <FieldError name="nome_completo" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <FieldError name="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone *</Label>
              <Input
                id="telefone"
                name="telefone"
                type="tel"
                value={formData.telefone}
                onChange={handlePhoneChange}
                maxLength={15}
                placeholder="(XX) XXXXX-XXXX"
                required
              />
              <FieldError name="telefone" />
            </div>
            <div className="space-y-2">
              <Label>Preferência de Contato *</Label>
              <RadioGroup
                name="preferencia_contato"
                value={formData.preferencia_contato}
                onValueChange={handleSelectChange('preferencia_contato')}
                className="flex space-x-4 pt-2"
              >
                {['E-mail', 'Telefone', 'WhatsApp'].map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`contact_${option}`} />
                    <Label htmlFor={`contact_${option}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
              <FieldError name="preferencia_contato" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assunto">Assunto *</Label>
            <Select
              name="assunto"
              value={formData.assunto}
              onValueChange={handleSelectChange('assunto')}
              required
            >
              <SelectTrigger id="assunto">
                <SelectValue placeholder="Selecione um assunto" />
              </SelectTrigger>
              <SelectContent>
                {[
                  'Informações gerais',
                  'Agendamento de test drive',
                  'Negociação de preço',
                  'Financiamento',
                  'Outro',
                ].map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError name="assunto" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mensagem">Mensagem *</Label>
            <Textarea
              id="mensagem"
              name="mensagem"
              value={formData.mensagem}
              onChange={handleInputChange}
              placeholder="Digite sua mensagem aqui..."
              required
            />
            <div className="text-xs text-muted-foreground text-right">
              {formData.mensagem.length} / 1000
            </div>
            <FieldError name="mensagem" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="financiamento"
                name="financiamento"
                checked={formData.financiamento}
                onCheckedChange={(checked: boolean | 'indeterminate') =>
                  setFormData((prev) => ({ ...prev, financiamento: !!checked }))
                }
              />
              <Label htmlFor="financiamento">Tenho interesse em financiamento</Label>
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox
                id="termos_privacidade"
                name="termos_privacidade"
                checked={formData.termos_privacidade}
                onCheckedChange={(checked: boolean | 'indeterminate') =>
                  setFormData((prev) => ({ ...prev, termos_privacidade: !!checked }))
                }
                required
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="termos_privacidade">
                  Eu concordo com os{' '}
                  <a href="/privacy" target="_blank" className="underline">
                    termos de privacidade
                  </a>
                  . *
                </Label>
                <FieldError name="termos_privacidade" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="receber_novidades"
                name="receber_novidades"
                checked={formData.receber_novidades}
                onCheckedChange={(checked: boolean | 'indeterminate') =>
                  setFormData((prev) => ({ ...prev, receber_novidades: !!checked }))
                }
              />
              <Label htmlFor="receber_novidades">
                Quero receber novidades e promoções por e-mail.
              </Label>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
