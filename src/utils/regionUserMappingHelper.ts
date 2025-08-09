import { REGIONS, CSBs } from "../services/csb/csb-region-mapping";

/**
 * Helper to derive the user's CSB and region mapping.
 *
 * @param groups - The list of groups the user belongs to.
 * @param organizationName - The value from "custom:organization".
 *
 * @returns An object with:
 *   - csbId: string | null  (null for HSW users)
 *   - regionsId: string[]   (array of region names)
 */
export function deriveRegions(
  groups: string[] = [],
  organizationName: string = ""
): { csbId: string | null; regionsId: string[] } {
  let csbId: string | null = null;
  const regionsId: string[] = [];
  const lowerOrg = organizationName.toLowerCase();

  // If the user is in the HSW group, use hospital mapping.
  if (groups.includes("DBHDS_DAP_HSW")) {
    REGIONS.forEach((region) => {
      const match = region.stateHospitalsInRegion.some(
        (hospitalName) => hospitalName.toLowerCase() === lowerOrg
      );
      if (match) {
        regionsId.push(region.name);
      }
    });
  } else {
    // Otherwise, use the CSB mapping.
    const matchedCSB = CSBs.find(
      (csb) => csb.CSBShortName.toLowerCase() === lowerOrg
    );
    if (matchedCSB) {
      csbId = matchedCSB.CSBProviderId;
      REGIONS.forEach((region) => {
        if (region.csb.includes(csbId)) {
          regionsId.push(region.name);
        }
      });
    }
  }

  return { csbId, regionsId };
}
