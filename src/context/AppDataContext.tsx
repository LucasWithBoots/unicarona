import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from "react";

import {
  availableRides,
  currentUser,
  myPublishedRides,
  rideRequests,
  users,
} from "../data/mockData";
import { OfferRideDraft, RequestStatus, Ride, RideRequest, User } from "../types";

interface AppDataContextValue {
  currentUser: User;
  rides: Ride[];
  myRides: Ride[];
  requests: RideRequest[];
  requestedRideIds: string[];
  getUserById: (id: string) => User | undefined;
  getRideById: (id: string) => Ride | undefined;
  requestRide: (rideId: string) => void;
  publishRide: (draft: OfferRideDraft) => Ride;
  updateRequestStatus: (requestId: string, status: RequestStatus) => void;
}

const AppDataContext = createContext<AppDataContextValue | undefined>(undefined);

export function AppDataProvider({ children }: PropsWithChildren) {
  const [localRides, setLocalRides] = useState<Ride[]>([]);
  const [requests, setRequests] = useState<RideRequest[]>(rideRequests);
  const [requestedRideIds, setRequestedRideIds] = useState<string[]>(() =>
    rideRequests
      .filter((request) => request.passengerId === currentUser.id)
      .map((request) => request.rideId),
  );

  const rides = useMemo(() => [...availableRides, ...localRides], [localRides]);
  const myRides = useMemo(() => [...myPublishedRides, ...localRides], [localRides]);

  const getUserById = useCallback((id: string) => {
    return users.find((user) => user.id === id);
  }, []);

  const getRideById = useCallback((id: string) => {
    return [...availableRides, ...myPublishedRides, ...localRides].find((ride) => ride.id === id);
  }, [localRides]);

  const requestRide = useCallback((rideId: string) => {
    if (requestedRideIds.includes(rideId)) {
      return;
    }

    setRequestedRideIds((current) => [...current, rideId]);
    setRequests((current) => [
      ...current,
      {
        id: `request-${Date.now()}`,
        rideId,
        passengerId: currentUser.id,
        status: "pending",
        message: "Gostaria de reservar uma vaga nesta carona.",
        createdAt: "Agora",
      },
    ]);
  }, [requestedRideIds]);

  const publishRide = useCallback((draft: OfferRideDraft) => {
    const newRide: Ride = {
      ...draft,
      id: `local-ride-${Date.now()}`,
      driverId: currentUser.id,
      safetyFeatures: ["Motorista verificado", "Solicitações aprovadas manualmente", "Rota compartilhável"],
      status: "published",
    };

    setLocalRides((current) => [newRide, ...current]);
    return newRide;
  }, []);

  const updateRequestStatus = useCallback((requestId: string, status: RequestStatus) => {
    setRequests((current) =>
      current.map((request) => (request.id === requestId ? { ...request, status } : request)),
    );
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      rides,
      myRides,
      requests,
      requestedRideIds,
      getUserById,
      getRideById,
      requestRide,
      publishRide,
      updateRequestStatus,
    }),
    [
      getRideById,
      getUserById,
      myRides,
      publishRide,
      requestRide,
      requestedRideIds,
      requests,
      rides,
      updateRequestStatus,
    ],
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppDataContext);

  if (!context) {
    throw new Error("useAppData must be used inside AppDataProvider");
  }

  return context;
}
