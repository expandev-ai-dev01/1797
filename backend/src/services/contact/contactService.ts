import { CreateContactData, ContactSubmission } from './contactTypes';
import { getCarById } from '@/services/car/carService';
import { logger } from '@/utils/logger';

// In-memory storage for contact submissions, adhering to the no-database constraint.
const contactSubmissions: ContactSubmission[] = [];

/**
 * @summary Generates a unique protocol number for a contact submission.
 * Format: YYYYMMDD + 6-digit sequential number.
 */
const generateProtocol = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const sequential = (contactSubmissions.length + 1).toString().padStart(6, '0');
  return `${year}${month}${day}${sequential}`;
};

/**
 * @summary Creates and stores a new contact submission.
 * @param data The contact form data from the request.
 * @returns An object with the protocol number on success, or an error message on failure.
 */
export const createContact = (
  data: CreateContactData
): { success: true; protocolo: string } | { success: false; error: string } => {
  const vehicle = getCarById(data.id_veiculo);

  if (!vehicle) {
    logger.warn('Contact submission failed: Vehicle not found', { vehicleId: data.id_veiculo });
    return { success: false, error: 'Veículo não encontrado.' };
  }

  const protocol = generateProtocol();
  const submission: ContactSubmission = {
    id_contato: protocol, // Using protocol as unique ID for simplicity
    ...data,
    modelo_veiculo: `${vehicle.specifications.brand} ${vehicle.specifications.model} (${vehicle.specifications.yearModel})`,
    data_envio: new Date().toISOString(),
    status: 'Novo',
    data_ultima_atualizacao: new Date().toISOString(),
  };

  contactSubmissions.push(submission);

  logger.info('New contact submission received', { protocol: submission.id_contato });

  // Simulate sending emails
  console.log(
    `\n--- SIMULATING EMAIL TO SALES TEAM ---\n` +
      `To: sales@example.com\n` +
      `Subject: Novo contato - ${submission.modelo_veiculo}\n` +
      `Body: ${JSON.stringify(submission, null, 2)}\n` +
      `--------------------------------------\n`
  );

  console.log(
    `\n--- SIMULATING CONFIRMATION EMAIL TO USER ---\n` +
      `To: ${submission.email}\n` +
      `Subject: Confirmação de contato - ${submission.modelo_veiculo}\n` +
      `Body: Olá ${submission.nome_completo}, recebemos seu contato. Protocolo: ${protocol}. Responderemos em até 24h úteis.\n` +
      `-------------------------------------------\n`
  );

  return { success: true, protocolo: protocol };
};
