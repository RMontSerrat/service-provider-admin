import * as z from 'zod';

const fileSchema = typeof File !== 'undefined'
  ? z.instanceof(File).refine(file => file.size <= 5 * 1024 * 1024, "O arquivo deve ser menor que 5MB")
  : z.never();

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Nome é obrigatório"),
  image: z.union([
    z.string().url("URL da imagem inválida"),
    fileSchema,
  ]),
  price: z.string().min(1, "Preço é obrigatório"),
  description: z.string().min(5, "Descrição é obrigatória"),
});