import { createMD5Hash } from "../str/index.js";

// Define a type for the constructor
type Constructor<T = {}> = new (...args: any[]) => T;

// Create mixin functions that take a base class and return an extended class
export function withFullName<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    firstName?: string;
    lastName?: string;
    email!: string;

    getFullName(): string {
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
    }

    getFormattedFirstName(): string {
      if (!this.firstName) return '';
      return this.firstName.toLowerCase().replace(/^\w/, c => c.toUpperCase());
    }

    getFormattedLastName(): string {
      if (!this.lastName) return '';
      return this.lastName.toLowerCase().replace(/^\w/, c => c.toUpperCase());
    }
  };
}

export function withGravatar<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    email!: string;

    getGravatar(
      size: number = 80,
      defaultImage: string = 'mm',
      rating: string = 'g',
      asImage: boolean = false,
      imgAttributes: Record<string, string> = {},
      alt: string = ''
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

      return `<img alt={alt} src="${baseUrl}" className={}>`;
    }
  };
}
