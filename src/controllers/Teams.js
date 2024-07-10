import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllTeams = async (req, res) => {
  const { userId } = req;

  try {
    const teams = await prisma.team.findMany({
      where: {
        OR: [
          { managerId: userId.userId },
          // { players: { some: { userId: userId.userId } } },
        ],
      },
      select: {
        id: true,
        name: true,
        manager: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        players: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    const cleanedTeams = teams.map((team) => ({
      ...team,
      players: team.players.map((player) => player.user),
    }));

    res.status(200).json({ teams: cleanedTeams });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Falha ao recuperar times" });
  }
};

export const createTeam = async (req, res) => {
  const { name } = req.body;
  const { userId } = req;

  try {
    const team = await prisma.team.create({
      data: {
        name,
        managerId: userId.userId,
      },
    });

    res.status(201).json({ team });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Falha ao criar time" });
  }
};

export const associatePlayer = async (req, res) => {
  const { playerId } = req.body;
  const { teamId } = req.params;

  try {
    const playerTeam = await prisma.playerTeam.create({
      data: {
        userId: playerId,
        teamId: teamId,
      },
    });

    const team = await prisma.team.findUnique({
      where: {
        id: teamId,
      },
      select: {
        id: true,
        name: true,
        players: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    res.status(201).json({ team });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Falha ao associar jogador ao time" });
  }
};
