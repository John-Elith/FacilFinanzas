// Tipos extendidos para incluir relaciones de Prisma

export interface MovementWithUser {
  id: string;
  amount: number;
  concept: string;
  date: string;
  userId: string;
  user?: {
    id: string;
    name: string | null;
    email: string;
  };
}
