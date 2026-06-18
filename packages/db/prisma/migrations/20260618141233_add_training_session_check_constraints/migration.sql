ALTER TABLE "TrainingSession"
ADD CONSTRAINT "TrainingSession_capacity_positive"
CHECK ("capacity" > 0);

ALTER TABLE "TrainingSession"
ADD CONSTRAINT "TrainingSession_ends_after_starts"
CHECK ("endsAtUtc" > "startsAtUtc");

ALTER TABLE "TrainingSession"
ADD CONSTRAINT "TrainingSession_price_non_negative"
CHECK ("priceCents" >= 0);

ALTER TABLE "TrainingSession"
ADD CONSTRAINT "TrainingSession_currency_uppercase_iso"
CHECK ("currency" ~ '^[A-Z]{3}$');
