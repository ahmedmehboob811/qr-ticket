import React, { useState } from 'react';
import QRCodeScanner from '../components/QRCodeScanner';
import { useDatabase } from '../context/DatabaseContext';
import { QrCodeIcon } from '../components/icons';

type ScanResult = {
  status: 'success' | 'error' | 'info';
  message: string;
};

const Scan: React.FC = () => {
  const { validateTicket } = useDatabase();
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [lastScannedId, setLastScannedId] = useState<string | null>(null);

  const handleScan = (data: string | null) => {
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        const { ticketId } = parsedData;

        if (!ticketId || typeof ticketId !== 'string') {
          setScanResult({ status: 'error', message: 'Invalid QR code format.' });
          return;
        }

        // Debounce to prevent multiple scans of the same ticket in quick succession
        if (ticketId === lastScannedId) {
          return;
        }
        setLastScannedId(ticketId);
        setTimeout(() => setLastScannedId(null), 3000); // Allow re-scan after 3 seconds

        const wasValidated = validateTicket(ticketId);

        if (wasValidated) {
          setScanResult({ status: 'success', message: `Ticket validated successfully!` });
        } else {
          // This could mean it was already validated, or the ID is totally invalid.
          setScanResult({ status: 'error', message: `Ticket is invalid or has already been checked in.` });
        }
      } catch (error) {
        setScanResult({ status: 'error', message: 'Could not parse QR code data.' });
      }
    }
  };

  const handleError = (err: any) => {
    console.error(err);
    setScanResult({ status: 'error', message: 'QR scanner error. Please check camera permissions.' });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-card rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 text-center border-b">
            <QrCodeIcon className="w-12 h-12 mx-auto text-primary" />
            <h1 className="text-2xl font-bold text-text mt-4">Scan Ticket QR Code</h1>
            <p className="text-muted mt-2">Point the camera at a ticket's QR code to validate it.</p>
          </div>
          <div className="p-4 bg-gray-900 relative">
            <div className="aspect-square max-w-md mx-auto rounded-lg overflow-hidden">
                <QRCodeScanner onScan={handleScan} onError={handleError} />
            </div>
          </div>
          {scanResult && (
            <div className={`p-6 text-center border-t transition-colors
              ${scanResult.status === 'success' && 'bg-green-50 text-green-800'}
              ${scanResult.status === 'error' && 'bg-red-50 text-red-800'}
              ${scanResult.status === 'info' && 'bg-blue-50 text-blue-800'}
            `}>
              <p className="font-semibold">{scanResult.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scan;
