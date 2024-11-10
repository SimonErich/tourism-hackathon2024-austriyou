export interface Persona {
  uuid: string;
  country: string;
}

export interface Activity {
  name: string;
  description: string;
}
export interface PointOfInterest {
  name: string;
  location: string;
  description: string;
  relatedActivities: Activity[];
}
