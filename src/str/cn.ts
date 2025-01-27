import clsx from "clsx";
import {ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

/**
 * ClassName merging
 *
 * @param inputs
 * @returns
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
