export interface DogBreed {
    id: string;
    name: string;
    temperament: string;
    life_span: string;
    image: { url: string };
  }
  
  export async function getAllBreeds(): Promise<DogBreed[]> {
    const response = await fetch('https://api.thedogapi.com/v1/breeds');
    if (!response.ok) throw new Error('Error al obtener las razas');
    return response.json();
  }
  
  export async function getBreedImage(breedId: string): Promise<string> {
    const response = await fetch(`https://api.thedogapi.com/v1/images/search?breed_id=${breedId}`);
    if (!response.ok) throw new Error('Error al obtener la imagen');
    const data = await response.json();
    return data[0]?.url || '';
  }
  