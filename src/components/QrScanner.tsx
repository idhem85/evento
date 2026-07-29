import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeCameraScanConfig } from "html5-qrcode";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, CameraOff, Loader2, ScanLine } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QrScannerProps {
  onResult: (result: string) => void;
}

const QR_SCANNER_ID = "evento-qr-reader";

export const QrScanner: React.FC<QrScannerProps> = ({ onResult }) => {
  const { toast } = useToast();
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState(true);
  const [cameraLoading, setCameraLoading] = useState(false);

  const startScanner = async () => {
    setCameraLoading(true);
    try {
      // Check if camera is available
      const devices = await Html5Qrcode.getCameras();
      if (!devices || devices.length === 0) {
        setHasCamera(false);
        toast({
          title: "Aucune caméra",
          description: "Aucune caméra n'a été détectée sur cet appareil.",
          variant: "destructive",
        });
        return;
      }

      // Use back camera if available
      const backCamera = devices.find(
        (d) => d.label.toLowerCase().includes("back") || d.label.toLowerCase().includes("environ")
      );
      const cameraId = backCamera?.id || devices[0].id;

      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode(QR_SCANNER_ID);
      }

      const config: Html5QrcodeCameraScanConfig = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1,
      };

      await scannerRef.current.start(
        cameraId,
        config,
        (decodedText) => {
          // Stop scanning on successful decode
          stopScanner();
          onResult(decodedText);
        },
        () => {
          // QR code not found, continue scanning (no-op)
        }
      );

      setIsScanning(true);
    } catch (error) {
      console.error("Error starting camera:", error);
      toast({
        title: "Erreur caméra",
        description: "Impossible d'accéder à la caméra. Vérifiez les permissions.",
        variant: "destructive",
      });
    } finally {
      setCameraLoading(false);
    }
  };

  const stopScanner = () => {
    if (scannerRef.current?.isScanning) {
      scannerRef.current.stop().catch(console.error);
    }
    setIsScanning(false);
  };

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-b from-gray-900 to-gray-800">
      <CardContent className="p-0">
        {/* Scanner viewport */}
        <div className="relative flex items-center justify-center min-h-[300px]">
          {!isScanning && !cameraLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/80 p-6">
              <ScanLine className="h-16 w-16 mb-4 text-primary/60" />
              <p className="text-center text-sm font-medium mb-1">
                Scanner de QR Code
              </p>
              <p className="text-center text-xs text-white/50 mb-4">
                {hasCamera
                  ? "Appuyez sur Démarrer pour activer la caméra"
                  : "Aucune caméra détectée"}
              </p>
            </div>
          )}

          {cameraLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-white/80">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm font-medium">Activation de la caméra...</p>
              </div>
            </div>
          )}

          {/* QR scanner element */}
          <div
            id={QR_SCANNER_ID}
            className="w-full"
          />

          {/* Scanning overlay */}
          {isScanning && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary rounded-tl" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary rounded-tr" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary rounded-bl" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary rounded-br" />

              {/* Scan line animation */}
              <div className="absolute left-[15%] right-[15%] top-[15%] h-[70%] overflow-hidden">
                <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-line shadow-lg shadow-primary/50" />
              </div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm rounded-full px-4 py-1.5">
                <p className="text-xs text-white font-medium">Scannez le QR code du badge</p>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-4 bg-background border-t">
          <div className="flex justify-center gap-3">
            {!isScanning ? (
              <Button
                onClick={startScanner}
                disabled={cameraLoading || !hasCamera}
                className="w-full max-w-xs gap-2 h-11 text-base font-semibold"
              >
                {cameraLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Camera className="h-5 w-5" />
                )}
                {cameraLoading ? "Activation..." : "Démarrer le scan"}
              </Button>
            ) : (
              <Button
                onClick={stopScanner}
                variant="destructive"
                className="w-full max-w-xs gap-2 h-11 text-base font-semibold"
              >
                <CameraOff className="h-5 w-5" />
                Arrêter le scan
              </Button>
            )}
          </div>

          {!hasCamera && (
            <p className="text-center text-xs text-destructive mt-2">
              Veuillez utiliser un appareil avec une caméra pour scanner les QR codes.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
