export interface IPersona {
  uuid: string;
  country: string;
}

export interface IActivity {
  name: string;
  description: string;
}
export interface IPointOfInterest {
  name: string;
  location: string;
  description: string;
  relatedActivities: IActivity[];
}
