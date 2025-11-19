export interface ContactFormData {
  nome_completo: string;
  email: string;
  telefone: string;
  preferencia_contato: 'Telefone' | 'E-mail' | 'WhatsApp' | '';
  melhor_horario?: 'Manhã' | 'Tarde' | 'Noite' | 'Qualquer horário';
  id_veiculo: string;
  assunto:
    | 'Informações gerais'
    | 'Agendamento de test drive'
    | 'Negociação de preço'
    | 'Financiamento'
    | 'Outro'
    | '';
  mensagem: string;
  financiamento?: boolean;
  termos_privacidade: boolean;
  receber_novidades?: boolean;
}

export interface CreateContactData extends Omit<ContactFormData, 'termos_privacidade'> {
  termos_privacidade: true;
}

export interface ContactSuccessResponse {
  protocolo: string;
}
