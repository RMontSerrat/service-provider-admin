import * as z from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  image: z.union([
    z.string().url("URL da imagem inválida"), // Aceita URL da imagem como string
    z.instanceof(File).refine(file => file.size <= 5 * 1024 * 1024, "O arquivo deve ser menor que 5MB") // Aceita um objeto File com validação de tamanho
  ]),
  price: z.number().min(0, "Preço deve ser um valor positivo"),
  description: z.string().optional(),
});