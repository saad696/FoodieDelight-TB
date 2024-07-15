export interface User {
    fullname: string
    gender: string
    phoneNumber: string
    email: string
    avatar: string
    password: string
    joined_at: string
    id: string
    address: string
    state: string
    city: string
    pincode: string
    restaurants: string[]
    orders: string[]
}

export interface Restaurants {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
    cuisine: string[];
    overall_rating: number;
    website: string;
    id: string;
    isTrending: boolean;
    menu: number[];
    menuItems: MenuItem[];
    reviews: Review[];
    pictures: string[];
    timings: { [key: string]: string };
    timingsObject?: { day: string; time: string }[];
    owner: string;
    description: string;
}

export interface MenuItem {
    id: number;
    name: string;
    ingredients: string[];
    instructions: string[];
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    servings: number;
    difficulty: string;
    cuisine: string;
    caloriesPerServing: number;
    tags: string[];
    image: string;
    rating: number;
    mealType: string[];
    price: string;
}

export interface Review {
    id: string;
    text: string;
    rating: number;
    created: string;
    author: string;
    restId: string;
}

export interface GalleryImages {
    src: string;
    height: number;
    width: number;
}

export type SearchOptions = {
    value: string;
    text: string;
    address: string;
    rating: number;
    image: string;
};
