import React from 'react';
import QRCode from 'qrcode.react';
import { Ticket } from '../types';

interface TicketQRCodeProps {
  ticket: Ticket;
}

const TicketQRCode: React.FC<TicketQRCodeProps> = ({ ticket }) => {
  // Check for valid ticket data before generating the QR code value.
  const isTicketValid = ticket && ticket.id && ticket.eventId && ticket.userId;

  const qrValue = isTicketValid
    ? JSON.stringify({
        ticketId: ticket.id,
        eventId: ticket.eventId,
        userId: ticket.userId,
      })
    : JSON.stringify({ error: 'invalid_ticket_data', message: 'This ticket is missing required information.' });

  return (
    <div className="p-4 bg-white rounded-lg shadow-inner">
      <QRCode
        value={qrValue}
        size={256}
        level="H"
        includeMargin={true}
        className="mx-auto"
        // Visually indicate that the QR code is for an invalid/fallback ticket.
        fgColor={isTicketValid ? '#000000' : '#d1d5db'} // Black for valid, gray for invalid.
      />
    </div>
  );
};

export default TicketQRCode;