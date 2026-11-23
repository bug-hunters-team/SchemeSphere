export function matchSchemeToProfile(scheme, profile) {
  const occupation = profile.occupation.toLowerCase();
  const isPotentialMatch = occupation.includes(scheme.matchingOccupation);

  return {
    ...scheme,
    matchStatus: isPotentialMatch ? 'potential' : 'not-matched',
    matchReason: isPotentialMatch ? scheme.matchingReason : scheme.notMatchingReason,
  };
}

export function groupSchemeMatches(schemes, profile) {
  return schemes.reduce((groups, scheme) => {
    const match = matchSchemeToProfile(scheme, profile);
    if (match.matchStatus === 'potential') {
      groups.potentialMatches.push(match);
    } else {
      groups.notMatched.push(match);
    }
    return groups;
  }, { potentialMatches: [], notMatched: [] });
}
