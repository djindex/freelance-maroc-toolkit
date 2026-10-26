/**
 * Utility to convert numbers to French words formatted specifically
 * for Moroccan commercial and legal invoices (Dirhams & Centimes).
 */

const UNITS = [
  "", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf",
  "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept",
  "dix-huit", "dix-neuf"
];

const TENS = [
  "", "", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante-dix",
  "quatre-vingts", "quatre-vingt-dix"
];

function convertLessThanThousand(n: number): string {
  if (n === 0) return "";

  let result = "";

  if (n >= 100) {
    const hundreds = Math.floor(n / 100);
    const rest = n % 100;
    if (hundreds === 1) {
      result += "cent";
    } else {
      result += UNITS[hundreds] + " cents";
    }
    if (rest > 0) {
      if (hundreds > 1) {
        // remove plural s if followed by another number
        result = result.replace(/cents$/, "cent");
      }
      result += " " + convertLessThanThousand(rest);
    }
    return result;
  }

  if (n < 20) {
    return UNITS[n];
  }

  const tens = Math.floor(n / 10);
  const units = n % 10;

  if (tens === 7) {
    // 70-79: soixante-dix, soixante et onze...
    if (units === 1) return "soixante et onze";
    return "soixante-" + UNITS[10 + units];
  }

  if (tens === 9) {
    // 90-99: quatre-vingt-dix, quatre-vingt-onze...
    return "quatre-vingt-" + UNITS[10 + units];
  }

  if (units === 0) {
    return TENS[tens];
  }

  if (units === 1 && tens < 8) {
    return TENS[tens] + " et un";
  }

  const tensStr = tens === 8 ? "quatre-vingt" : TENS[tens];
  return tensStr + "-" + UNITS[units];
}

export function numberToWordsFrench(amount: number): string {
  if (isNaN(amount) || amount === 0) {
    return "zéro Dirham";
  }

  const integerPart = Math.floor(Math.abs(amount));
  const decimalPart = Math.round((Math.abs(amount) - integerPart) * 100);

  let words = "";

  if (integerPart === 0) {
    words = "zéro";
  } else {
    const millions = Math.floor(integerPart / 1000000);
    const thousands = Math.floor((integerPart % 1000000) / 1000);
    const remainder = integerPart % 1000;

    const parts: string[] = [];

    if (millions > 0) {
      if (millions === 1) {
        parts.push("un million");
      } else {
        parts.push(convertLessThanThousand(millions) + " millions");
      }
    }

    if (thousands > 0) {
      if (thousands === 1) {
        parts.push("mille");
      } else {
        parts.push(convertLessThanThousand(thousands) + " mille");
      }
    }

    if (remainder > 0) {
      parts.push(convertLessThanThousand(remainder));
    }

    words = parts.join(" ");
  }

  // Capitalize first letter
  words = words.charAt(0).toUpperCase() + words.slice(1);

  let formatted = `${words} Dirhams`;
  if (integerPart <= 1) {
    formatted = `${words} Dirham`;
  }

  if (decimalPart > 0) {
    const decWords = convertLessThanThousand(decimalPart);
    formatted += ` et ${decWords} Centime${decimalPart > 1 ? "s" : ""}`;
  }

  return formatted;
}
