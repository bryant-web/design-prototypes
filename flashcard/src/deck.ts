export type Card = {
  id: number;
  front: string;
  back: string;
};

export const DECK_TITLE = "Spanish Vocabulary";

export const DECK: Card[] = [
  { id: 1, front: "Gato", back: "Cat" },
  { id: 2, front: "Perro", back: "Dog" },
  { id: 3, front: "Dormir", back: "To sleep" },
  { id: 4, front: "La escuela", back: "School" },
  { id: 5, front: "El gato duerme en el sol.", back: "The cat sleeps in the sun." },
  { id: 6, front: "Rojo", back: "Red" },
  { id: 7, front: "El libro", back: "Book" },
  { id: 8, front: "Comer", back: "To eat" },
  { id: 9, front: "La ventana", back: "Window" },
  { id: 10, front: "Feliz", back: "Happy" },
];
