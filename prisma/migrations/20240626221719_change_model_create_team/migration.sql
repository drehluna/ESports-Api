-- CreateEnum
CREATE TYPE "PlayerRole" AS ENUM ('PLAYER', 'MANAGER');

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "roles" "PlayerRole"[],

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlayerTeams" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ManagerTeams" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PlayerTeams_AB_unique" ON "_PlayerTeams"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayerTeams_B_index" ON "_PlayerTeams"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ManagerTeams_AB_unique" ON "_ManagerTeams"("A", "B");

-- CreateIndex
CREATE INDEX "_ManagerTeams_B_index" ON "_ManagerTeams"("B");

-- AddForeignKey
ALTER TABLE "_PlayerTeams" ADD CONSTRAINT "_PlayerTeams_A_fkey" FOREIGN KEY ("A") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerTeams" ADD CONSTRAINT "_PlayerTeams_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ManagerTeams" ADD CONSTRAINT "_ManagerTeams_A_fkey" FOREIGN KEY ("A") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ManagerTeams" ADD CONSTRAINT "_ManagerTeams_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
