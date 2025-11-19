export interface CreateContactData {
  // Personal Data
  nome_completo: string;
  email: string;
  telefone: string;
  preferencia_contato: 'Telefone' | 'E-mail' | 'WhatsApp';
  melhor_horario?: 'Manhã' | 'Tarde' | 'Noite' | 'Qualquer horário';

  // Vehicle Interest
  id_veiculo: string;
  assunto:
    | 'Informações gerais'
    | 'Agendamento de test drive'
    | 'Negociação de preço'
    | 'Financiamento'
    | 'Outro';
  mensagem: string;
  financiamento?: boolean;

  // Submission and Confirmation
  termos_privacidade: boolean;
  receber_novidades?: boolean;

  // System Filled
  ip_usuario: string;
}

export interface ContactSubmission extends CreateContactData {
  id_contato: string;
  modelo_veiculo: string;
  data_envio: string; // ISO 8601
  status: 'Novo' | 'Em atendimento' | 'Concluído' | 'Cancelado';
  consultor_responsavel?: string;
  data_ultima_atualizacao: string; // ISO 8601
  notas_atendimento?: string;
}
