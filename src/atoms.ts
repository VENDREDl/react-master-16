import { atom, selector } from "recoil";

export const isDarkAtom = atom({
    key: 'isDark',
    default: false,
})

export interface TravelProps {
    country: string;
    id: string;
    category: "WISH" | "TRAVELED" | "LIKED" | "REMOVE"
}

export const categoryState = atom({
    key:"category",
    default:"WISH"
})

export const TravelListState = atom<TravelProps[]>({
    key: 'travelList',
    default: [],
})

export const TravelListSelector = selector({
    key: "travelListSelector",
    get: ({ get }) => {
        const travelList = get(TravelListState);
        return [
            travelList.filter(travelList => travelList.category === "WISH"),
            travelList.filter(travelList => travelList.category === "TRAVELED"),
            travelList.filter(travelList => travelList.category === "LIKED")
        ];
    }
})