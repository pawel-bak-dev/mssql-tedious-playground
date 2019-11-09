create table table_one
(
  id                            int not null primary key,
  app_type                      int,
  app_status                    nvarchar(50),
  date_completed                datetime2(6),
  date_created                  datetime2(6),
  is_da_completed               bit,
  terminals                     varchar(max),
  berths                        varchar(max),
  advance_requested_when        date,
  advance_requested_amount      numeric(9, 2),
  created                       datetime2(6),
)
go