import { z } from 'zod';

const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;

export const createContactSchema = z.object({
  body: z.object({
    // FC-001: Personal Data
    nome_completo: z
      .string({
        required_error: 'Nome completo é obrigatório.',
      })
      .min(3, 'O nome deve conter pelo menos 3 caracteres.')
      .max(100, 'O nome deve conter no máximo 100 caracteres.')
      .refine((name) => name.trim().split(' ').length >= 2, {
        message: 'Por favor, informe seu nome completo (nome e sobrenome).',
      }),
    email: z
      .string({
        required_error: 'E-mail é obrigatório.',
      })
      .email('Por favor, informe um endereço de e-mail válido.')
      .max(100, 'O e-mail deve conter no máximo 100 caracteres.'),
    telefone: z
      .string({
        required_error: 'Telefone é obrigatório.',
      })
      .min(14, 'O telefone deve conter pelo menos 10 dígitos incluindo DDD.') // (XX) XXXX-XXXX
      .max(15, 'O telefone é inválido.') // (XX) XXXXX-XXXX
      .regex(phoneRegex, 'Formato de telefone inválido. Use (XX) XXXXX-XXXX.'),
    preferencia_contato: z.enum(['Telefone', 'E-mail', 'WhatsApp'], {
      required_error: 'Preferência de contato é obrigatória.',
    }),
    melhor_horario: z.enum(['Manhã', 'Tarde', 'Noite', 'Qualquer horário']).optional(),

    // FC-002: Vehicle Interest
    id_veiculo: z.string({
      required_error: 'ID do veículo é obrigatório.',
    }),
    assunto: z.enum(
      [
        'Informações gerais',
        'Agendamento de test drive',
        'Negociação de preço',
        'Financiamento',
        'Outro',
      ],
      {
        required_error: 'Assunto é obrigatório.',
      }
    ),
    mensagem: z
      .string({
        required_error: 'Mensagem é obrigatória.',
      })
      .min(10, 'A mensagem deve conter no mínimo 10 caracteres.')
      .max(1000, 'A mensagem deve conter no máximo 1000 caracteres.'),
    financiamento: z.boolean().optional().default(false),

    // FC-003: Submission and Confirmation
    termos_privacidade: z.literal(true, {
      errorMap: () => ({ message: 'É necessário concordar com os termos de privacidade.' }),
    }),
    receber_novidades: z.boolean().optional().default(false),
  }),
});
