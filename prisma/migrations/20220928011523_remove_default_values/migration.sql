-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hotel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "isOpen" BOOLEAN NOT NULL,
    "price" REAL NOT NULL,
    "rooms" INTEGER NOT NULL,
    "breakfast" BOOLEAN NOT NULL,
    "cityId" TEXT NOT NULL,
    "bannerUrl" TEXT NOT NULL,
    "coordinates" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Hotel_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Hotel" ("bannerUrl", "breakfast", "cityId", "coordinates", "createdAt", "id", "isOpen", "name", "price", "rooms") SELECT "bannerUrl", "breakfast", "cityId", "coordinates", "createdAt", "id", "isOpen", "name", "price", "rooms" FROM "Hotel";
DROP TABLE "Hotel";
ALTER TABLE "new_Hotel" RENAME TO "Hotel";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
