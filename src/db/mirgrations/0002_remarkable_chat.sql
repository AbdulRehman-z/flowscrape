CREATE TABLE IF NOT EXISTS "passwordResetToken" (
	"id" text,
	"email" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "passwordResetToken_email_token_unique" UNIQUE("email","token")
);
