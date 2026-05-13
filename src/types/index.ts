export type Shift = "Matutino" | "Vespertino" | "Noturno" | "Integral";

export type RequestStatus = "pending" | "accepted" | "declined";

export type RideStatus = "available" | "published" | "active" | "completed";

export type VerificationMethod = "email" | "document";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarInitials: string;
  university: string;
  campus: string;
  shift: Shift;
  course: string;
  verified: boolean;
  rating: number;
  trips: number;
  phone?: string;
}

export interface Ride {
  id: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
  suggestedPrice: string;
  seats: number;
  campus: string;
  recurrence: string;
  meetingPoint: string;
  notes: string;
  driverId: string;
  safetyFeatures: string[];
  status: RideStatus;
}

export interface OfferRideDraft {
  origin: string;
  destination: string;
  date: string;
  time: string;
  seats: number;
  suggestedPrice: string;
  campus: string;
  recurrence: string;
  meetingPoint: string;
  notes: string;
}

export interface RideRequest {
  id: string;
  rideId: string;
  passengerId: string;
  status: RequestStatus;
  message: string;
  createdAt: string;
}

export interface Review {
  id: string;
  rideId: string;
  fromUserId: string;
  toUserId: string;
  rating: number;
  comment: string;
  criteria: string[];
}

export interface Trip {
  id: string;
  rideId: string;
  status: "scheduled" | "active" | "completed";
  completedAt?: string;
}
