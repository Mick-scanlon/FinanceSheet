-- CreateTable
CREATE TABLE "expenses" (
    "id" SERIAL NOT NULL,
    "category" VARCHAR,
    "description" TEXT,
    "user_id" INTEGER,
    "amount" DOUBLE PRECISION,
    "date" TIMESTAMP(6),
    "payment_method" INTEGER,
    "recurring" BOOLEAN,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "income" (
    "id" SERIAL NOT NULL,
    "amount_gross" DOUBLE PRECISION NOT NULL,
    "amount_net" DOUBLE PRECISION NOT NULL,
    "amount_tax" DOUBLE PRECISION NOT NULL,
    "paid_date" TIMESTAMP(6) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "income_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_methods" (
    "user_id" INTEGER NOT NULL,
    "type" VARCHAR,
    "payment_name" VARCHAR NOT NULL,

    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("user_id","payment_name")
);

-- CreateTable
CREATE TABLE "shared_users" (
    "user_one" INTEGER NOT NULL,
    "user_two" INTEGER NOT NULL,
    "one_percent" DOUBLE PRECISION,
    "two_percent" DOUBLE PRECISION,

    CONSTRAINT "shared_users_pkey" PRIMARY KEY ("user_one","user_two")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR,
    "password" VARCHAR,
    "created_at" TIMESTAMP(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "income_id_paid_date_idx" ON "income"("id", "paid_date");

-- CreateIndex
CREATE INDEX "income_id_paid_date_idx1" ON "income"("id", "paid_date");

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "income" ADD CONSTRAINT "income_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payment_methods" ADD CONSTRAINT "payment_methods_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
