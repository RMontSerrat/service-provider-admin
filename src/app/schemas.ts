import * as z from 'zod';

export const productSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  imagem: z.string().url("URL da imagem inválida"),
  preco: z.number().min(0, "Preço deve ser um valor positivo"),
  descricao: z.string().optional(),
});