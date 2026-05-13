import { NavigatorScreenParams } from "@react-navigation/native";

import { OfferRideDraft } from "../types";

export type TabParamList = {
  Home: undefined;
  OfferRide: undefined;
  MyRides: undefined;
  Safety: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Verification: { name?: string; email?: string } | undefined;
  MainTabs: NavigatorScreenParams<TabParamList> | undefined;
  Filters: undefined;
  RideDetails: { rideId: string };
  RequestConfirmed: { rideId: string };
  OfferReview: { draft: OfferRideDraft };
  ReceivedRequests: undefined;
  ActiveTrip: { rideId?: string } | undefined;
  TripReview: { rideId?: string } | undefined;
};
