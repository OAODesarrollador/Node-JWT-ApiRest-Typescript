-- CreateTable
CREATE TABLE "IUsuario" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "creadoEl" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEl" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IUsuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IUsuario_email_key" ON "IUsuario"("email");
