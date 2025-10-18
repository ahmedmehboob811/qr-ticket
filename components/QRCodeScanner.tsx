import React from 'react';
// Note: This component assumes `react-qr-reader` is installed as a project dependency.
import { QrReader } from 'react-qr-reader';

interface QRCodeScannerProps {
  onScan: (data: string | null) => void;
  onError: (error: any) => void;
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onScan, onError }) => {
  return (
    <QrReader
      onResult={(result, error) => {
        if (result) {
          onScan(result.getText());
        }
        if (error) {
           // 'NotFoundException' is fired continuously when no QR code is detected.
           // We can safely ignore it to avoid spamming the console.
          if (error.name !== 'NotFoundException') {
            onError(error);
          }
        }
      }}
      constraints={{ facingMode: 'environment' }}
      containerStyle={{ width: '100%' }}
    />
  );
};

export default QRCodeScanner;
