"use client";

import { Camera, ShieldAlert, VideoOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CameraPermissionState } from "@/types";

type Props = {
  permission: CameraPermissionState;
  error: string | null;
  onRequestAccess: () => void;
};

export function PermissionGate({ permission, error, onRequestAccess }: Props) {
  if (permission === "unsupported") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-10 text-center">
        <VideoOff className="h-10 w-10 text-foreground/40" aria-hidden="true" />
        <div>
          <p className="font-medium">Camera not supported</p>
          <p className="mt-1 max-w-sm text-sm text-foreground/60">
            {error ?? "Your browser does not support camera access."}
          </p>
        </div>
      </div>
    );
  }

  if (permission === "denied") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-10 text-center">
        <ShieldAlert className="h-10 w-10 text-amber-500" aria-hidden="true" />
        <div>
          <p className="font-medium">Camera access denied</p>
          <p className="mt-1 max-w-sm text-sm text-foreground/60">
            {error ??
              "Enable camera permissions for this site in your browser settings, then try again."}
          </p>
        </div>
        <Button onClick={onRequestAccess}>Try again</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5 p-10 text-center">
      <div className="brand-gradient-bg flex h-16 w-16 items-center justify-center rounded-2xl text-white">
        <Camera className="h-7 w-7" aria-hidden="true" />
      </div>
      <div>
        <p className="text-lg font-semibold">Camera access required</p>
        <p className="mx-auto mt-1 max-w-sm text-sm text-foreground/60">
          Your video stays on this device. Nothing is uploaded or recorded.
        </p>
      </div>
      <Button size="lg" onClick={onRequestAccess}>
        Allow camera access
      </Button>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
