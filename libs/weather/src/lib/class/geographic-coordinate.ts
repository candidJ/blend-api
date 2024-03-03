export class GeographicCoordinate {
  readonly #longitude: number;
  readonly #latitude: number;

  constructor(latitudeInDegrees: number, longitudeInDegrees: number) {
    if (!this.isValidLatitude(latitudeInDegrees)) {
      throw new InvalidLatitudeException(
        'Latitude should be between -90 and 90 degrees. Invalid Latitude in degrees: ' +
          latitudeInDegrees,
      );
    }
    if (!this.isValidLongitude(longitudeInDegrees)) {
      throw new InValidLongitudeException(
        'Longitude should be between -180 and 180 degrees. Invalid Longitude in degrees: ' +
          longitudeInDegrees,
      );
    }
    this.#longitude = longitudeInDegrees;
    this.#latitude = latitudeInDegrees;
  }

  longitude(): string {
    return this.#longitude.toString();
  }

  latitude(): string {
    return this.#latitude.toString();
  }

  private isValidLatitude(latitudeInDegrees: number): boolean {
    return latitudeInDegrees >= -90 && latitudeInDegrees <= 90;
  }

  private isValidLongitude(longitudeInDegrees: number): boolean {
    return longitudeInDegrees >= -180 && longitudeInDegrees <= 180;
  }
}

class InvalidLatitudeException extends Error {}
class InValidLongitudeException extends Error {}
