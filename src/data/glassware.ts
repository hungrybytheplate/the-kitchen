export interface Glassware {
  id: string;
  name: string;
  icon: string;
  description: string;
  bestFor: string[];
  capacity: string;
  tips: string;
}

export const glasswareGuide: Glassware[] = [
  {
    id: "highball",
    name: "Highball Glass",
    icon: "🥛",
    description: "A tall, slim glass perfect for drinks with a high ratio of mixer to spirit. The height showcases carbonation beautifully.",
    bestFor: ["Mojito", "Gin & Tonic", "Dark 'n' Stormy", "Tom Collins", "Paloma"],
    capacity: "8-12 oz (240-350ml)",
    tips: "Fill with ice before pouring to keep drinks cold longer. The tall shape preserves carbonation."
  },
  {
    id: "rocks",
    name: "Rocks / Old Fashioned",
    icon: "🥃",
    description: "A short, sturdy glass with a thick base. Ideal for spirits served neat, on the rocks, or stirred cocktails.",
    bestFor: ["Old Fashioned", "Whiskey Sour", "Negroni", "Sazerac", "White Russian"],
    capacity: "6-10 oz (180-300ml)",
    tips: "Use large ice cubes or spheres - they melt slower and dilute your drink less."
  },
  {
    id: "martini",
    name: "Martini / Cocktail Glass",
    icon: "🍸",
    description: "The iconic V-shaped glass with a long stem. The wide rim releases aromatics while the stem keeps hands from warming the drink.",
    bestFor: ["Martini", "Cosmopolitan", "Manhattan", "Espresso Martini", "Gimlet"],
    capacity: "4-6 oz (120-180ml)",
    tips: "Chill the glass in the freezer for 10 minutes before serving for the perfect cold cocktail."
  },
  {
    id: "coupe",
    name: "Coupe Glass",
    icon: "🍷",
    description: "A shallow, broad-bowled glass with an elegant stem. Originally for champagne, now beloved for craft cocktails.",
    bestFor: ["Daiquiri", "Sidecar", "Aviation", "Champagne Cocktails", "Margarita (up)"],
    capacity: "5-7 oz (150-210ml)",
    tips: "The wide surface area releases aromatics beautifully. Perfect for drinks served 'up' (no ice)."
  },
  {
    id: "wine",
    name: "Wine Glass",
    icon: "🍷",
    description: "A versatile stemmed glass with a rounded bowl. Great for wine-based cocktails and spritzers.",
    bestFor: ["Sangria", "Aperol Spritz", "Kir Royale", "Wine Spritzer", "Mulled Wine"],
    capacity: "8-14 oz (240-420ml)",
    tips: "Hold by the stem to prevent warming the drink. The bowl shape concentrates aromas."
  },
  {
    id: "collins",
    name: "Collins Glass",
    icon: "🥤",
    description: "Taller and narrower than a highball, perfect for long, refreshing drinks with plenty of ice and mixers.",
    bestFor: ["Tom Collins", "John Collins", "Singapore Sling", "Long Island Iced Tea"],
    capacity: "10-14 oz (300-420ml)",
    tips: "The extra height allows for more mixer and ice, perfect for hot summer days."
  },
  {
    id: "hurricane",
    name: "Hurricane Glass",
    icon: "🍹",
    description: "A tall, curved glass shaped like a hurricane lamp. Made famous in New Orleans for tropical drinks.",
    bestFor: ["Hurricane", "Piña Colada", "Blue Lagoon", "Tropical Punch", "Singapore Sling"],
    capacity: "15-20 oz (450-600ml)",
    tips: "The large size is perfect for elaborate garnishes and layered tropical drinks."
  },
  {
    id: "copper-mug",
    name: "Copper Mug",
    icon: "🍺",
    description: "A traditional copper mug that keeps drinks ice cold. The metal conducts temperature for an extra-chilly experience.",
    bestFor: ["Moscow Mule", "Kentucky Mule", "Dark 'n' Stormy", "Mint Julep"],
    capacity: "12-16 oz (350-475ml)",
    tips: "The copper gets frosty cold and keeps your drink chilled. Some say it enhances the flavor!"
  },
  {
    id: "champagne-flute",
    name: "Champagne Flute",
    icon: "🥂",
    description: "A tall, narrow glass designed to preserve carbonation and showcase elegant bubbles rising to the top.",
    bestFor: ["Mimosa", "Bellini", "French 75", "Champagne Cocktail", "Kir Royale"],
    capacity: "6-8 oz (180-240ml)",
    tips: "The narrow opening preserves bubbles longer. Never fill more than two-thirds full."
  },
  {
    id: "margarita",
    name: "Margarita Glass",
    icon: "🍸",
    description: "A wide-rimmed glass with a distinctive stepped bowl shape. The broad rim is perfect for salt or sugar.",
    bestFor: ["Margarita", "Frozen Daiquiri", "Frozen Margarita", "Strawberry Margarita"],
    capacity: "10-14 oz (300-420ml)",
    tips: "Run a lime wedge around the rim and dip in salt for the classic salted rim."
  },
  {
    id: "irish-coffee",
    name: "Irish Coffee Mug",
    icon: "☕",
    description: "A heat-resistant glass mug with a handle. Perfect for hot cocktails that you can safely hold.",
    bestFor: ["Irish Coffee", "Hot Toddy", "Hot Buttered Rum", "Mulled Wine", "Spiked Cider"],
    capacity: "8-10 oz (240-300ml)",
    tips: "Preheat with hot water before adding your drink to keep it warm longer."
  },
  {
    id: "shot",
    name: "Shot Glass",
    icon: "🥃",
    description: "A small glass for quick sips. Can be used for straight spirits or layered shooters.",
    bestFor: ["Shooters", "Tequila", "Whiskey", "B-52", "Jägermeister"],
    capacity: "1-2 oz (30-60ml)",
    tips: "Chill in the freezer for cold shots, or warm slightly for room-temperature sipping."
  },
];

export const getGlasswareForDrinkType = (drinkType: string): Glassware[] => {
  const typeMap: Record<string, string[]> = {
    cocktail: ["martini", "coupe", "rocks", "highball"],
    mocktail: ["highball", "collins", "hurricane", "wine"],
    smoothie: ["hurricane", "collins", "highball"],
    wellness: ["highball", "collins", "wine"],
  };
  
  const glassIds = typeMap[drinkType] || ["highball"];
  return glasswareGuide.filter(g => glassIds.includes(g.id));
};
