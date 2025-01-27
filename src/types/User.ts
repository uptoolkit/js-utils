import { createMD5Hash } from "../str/index.js";
import { withFullName, withGravatar } from '../mixins/index.js';

// Base class
class BaseUser implements User {
  constructor(
    public email: string,
    public firstName?: string,
    public lastName?: string
  ) {}
    getGravatar(size?: number, defaultImage?: string, rating?: string, asImage?: boolean, imgAttributes?: Record<string, string>): string {
        throw new Error("Method not implemented.");
    }
    getFullName(): string {
        throw new Error("Method not implemented.");
    }
    getFormattedFirstName(): string {
        throw new Error("Method not implemented.");
    }
    getFormattedLastName(): string {
        throw new Error("Method not implemented.");
    }
}

export const User = withGravatar(withFullName(BaseUser));

// Create a type for the instance
export type User = InstanceType<typeof User>;

export const hasFullNameTrait = () => ({
  /**
   * Get full name from first and last name
   */
  getFullName(this: User): string {
    if (!this.firstName && !this.lastName) {
      return this.email;
    }

    if (this.firstName && !this.lastName) {
      return this.firstName;
    }

    if (!this.firstName && this.lastName) {
      return this.lastName;
    }

    return `${this.firstName} ${this.lastName}`;
  },

  /**
   * Format first name with proper capitalization
   */
  getFormattedFirstName(this: User): string {
    if (!this.firstName) return '';
    return this.firstName.toLowerCase().replace(/^\w/, c => c.toUpperCase());
  },

  /**
   * Format last name with proper capitalization
   */
  getFormattedLastName(this: User): string {
    if (!this.lastName) return '';
    return this.lastName.toLowerCase().replace(/^\w/, c => c.toUpperCase());
  },

  /**
   * Get Gravatar URL
   * @param size - Size in pixels
   * @param defaultImage - Default image type (mm, identicon, monsterid, etc.)
   * @param rating - Rating (g, pg, r, x)
   * @param asImage - Return as HTML img tag
   * @param imgAttributes - HTML attributes for img tag
   */
  getGravatar(
    this: User,
    size: number = 80,
    defaultImage: string = 'mm',
    rating: string = 'g',
    asImage: boolean = false,
    imgAttributes: Record<string, string> = {}
  ): string {
    const email = this.email.toLowerCase().trim();
    const hash = createMD5Hash(email);
    const baseUrl = `https://www.gravatar.com/avatar/${hash}?s=${size}&d=${defaultImage}&r=${rating}`;

    if (!asImage) {
      return baseUrl;
    }

    const attributes = Object.entries(imgAttributes)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');

    return `<img src="${baseUrl}" ${attributes}>`;
  }
});
