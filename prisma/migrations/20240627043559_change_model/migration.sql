/*
  Warnings:

  - You are about to drop the column `userId` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the `_PlayerTeams` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `managerId` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_userId_fkey";

-- DropForeignKey
ALTER TABLE "_PlayerTeams" DROP CONSTRAINT "_PlayerTeams_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlayerTeams" DROP CONSTRAINT "_PlayerTeams_B_fkey";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "userId",
ADD COLUMN     "managerId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_PlayerTeams";

-- CreateTable
CREATE TABLE "PlayerTeam" (
    "userId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "PlayerTeam_pkey" PRIMARY KEY ("userId","teamId")
);

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerTeam" ADD CONSTRAINT "PlayerTeam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerTeam" ADD CONSTRAINT "PlayerTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
