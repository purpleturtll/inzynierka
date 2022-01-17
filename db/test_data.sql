CREATE DATABASE $(MSSQL_DB);
GO
USE $(MSSQL_DB);
GO
CREATE LOGIN $(MSSQL_USER) WITH PASSWORD = '$(MSSQL_PASSWORD)';
GO
CREATE USER $(MSSQL_USER) FOR LOGIN $(MSSQL_USER);
GO
ALTER SERVER ROLE sysadmin ADD MEMBER [$(MSSQL_USER)];
GO
USE $(MSSQL_DB)
GO
/****** Object:  Table [dbo].[animal_types]    Script Date: 05.06.2021 00:42:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF OBJECT_ID(N'dbo.animal_types', N'U') IS NULL
CREATE TABLE [dbo].[animal_types](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[created_at] [datetimeoffset](7) NULL,
	[updated_at] [datetimeoffset](7) NULL,
	[deleted_at] [datetimeoffset](7) NULL,
	[type] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[animals]    Script Date: 05.06.2021 00:42:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF OBJECT_ID(N'dbo.animals', N'U') IS NULL
CREATE TABLE [dbo].[animals](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[created_at] [datetimeoffset](7) NULL,
	[updated_at] [datetimeoffset](7) NULL,
	[deleted_at] [datetimeoffset](7) NULL,
	[animal_type_id] [bigint] NULL,
	[breed] [nvarchar](max) NULL,
	[name] [nvarchar](max) NULL,
	[shelter_id] [bigint] NULL,
	[adoptable] [bit] NULL,
	[description] [nvarchar](max) NULL,
	[age] [bigint] NULL,
	[weight] [float] NULL,
	[sex] [nvarchar](max) NULL,
	[admission_date] [datetimeoffset](7) NULL,
	[chip_number] [nvarchar](max) NULL,
	[recently_found] [bit] NULL,
	[is_sterilized] [bit] NULL,
	[is_vaccinated] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[chats]    Script Date: 05.06.2021 00:42:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF OBJECT_ID(N'dbo.chats', N'U') IS NULL
CREATE TABLE [dbo].[chats](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[created_at] [datetimeoffset](7) NULL,
	[updated_at] [datetimeoffset](7) NULL,
	[deleted_at] [datetimeoffset](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[fav_animals]    Script Date: 05.06.2021 00:42:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF OBJECT_ID(N'dbo.fav_animals', N'U') IS NULL
CREATE TABLE [dbo].[fav_animals](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[created_at] [datetimeoffset](7) NULL,
	[updated_at] [datetimeoffset](7) NULL,
	[deleted_at] [datetimeoffset](7) NULL,
	[animal_id] [bigint] NOT NULL,
	[user_id] [bigint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[animal_id] ASC,
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[pictures]    Script Date: 05.06.2021 00:42:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF OBJECT_ID(N'dbo.pictures', N'U') IS NULL
CREATE TABLE [dbo].[pictures](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[created_at] [datetimeoffset](7) NULL,
	[updated_at] [datetimeoffset](7) NULL,
	[deleted_at] [datetimeoffset](7) NULL,
	[animal_id] [bigint] NULL,
	[path] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[shelters]    Script Date: 05.06.2021 00:42:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF OBJECT_ID(N'dbo.shelters', N'U') IS NULL
CREATE TABLE [dbo].[shelters](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[created_at] [datetimeoffset](7) NULL,
	[updated_at] [datetimeoffset](7) NULL,
	[deleted_at] [datetimeoffset](7) NULL,
	[username] [nvarchar](max) NULL,
	[password] [nvarchar](max) NULL,
	[email] [nvarchar](max) NULL,
	[phone_number] [nvarchar](max) NULL,
	[n_ip] [nvarchar](max) NULL,
	[city] [nvarchar](max) NULL,
	[street] [nvarchar](max) NULL,
	[street_number] [nvarchar](max) NULL,
	[postal_code] [nvarchar](max) NULL,
	[description] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 05.06.2021 00:42:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF OBJECT_ID(N'dbo.users', N'U') IS NULL
CREATE TABLE [dbo].[users](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[created_at] [datetimeoffset](7) NULL,
	[updated_at] [datetimeoffset](7) NULL,
	[deleted_at] [datetimeoffset](7) NULL,
	[password] [nvarchar](max) NULL,
	[firstname] [nvarchar](max) NULL,
	[surname] [nvarchar](max) NULL,
	[email] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[fav_animals]  WITH CHECK ADD  CONSTRAINT [fk_fav_animals_animal] FOREIGN KEY([animal_id])
REFERENCES [dbo].[animals] ([id])
GO
ALTER TABLE [dbo].[fav_animals] CHECK CONSTRAINT [fk_fav_animals_animal]
GO
ALTER TABLE [dbo].[fav_animals]  WITH CHECK ADD  CONSTRAINT [fk_fav_animals_user] FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[fav_animals] CHECK CONSTRAINT [fk_fav_animals_user]
GO

USE [INZ_DB]
GO

INSERT INTO [dbo].[animal_types]
           ([created_at]
           ,[updated_at]
           ,[deleted_at]
           ,[type])
     VALUES
           (SYSDATETIMEOFFSET()
           ,NULL
           ,NULL
           ,N'pies'),
           (SYSDATETIMEOFFSET()
           ,NULL
           ,NULL
           ,N'kot'),
           (SYSDATETIMEOFFSET()
           ,NULL
           ,NULL
           ,N'gryzoń'),
            (SYSDATETIMEOFFSET()
           ,NULL
           ,NULL
           ,N'gad'),
            (SYSDATETIMEOFFSET()
           ,NULL
           ,NULL
           ,N'ptak'),
           (SYSDATETIMEOFFSET()
           ,NULL
           ,NULL
           ,N'królik'),
           (SYSDATETIMEOFFSET()
           ,NULL
           ,NULL
           ,N'inne')
GO

USE [INZ_DB]
GO

INSERT INTO [dbo].[shelters]
           ([created_at]
           ,[updated_at]
           ,[deleted_at]
           ,[username]
           ,[password]
           ,[email]
           ,[phone_number]
           ,[n_ip]
           ,[city]
           ,[street]
           ,[street_number]
           ,[postal_code]
           ,[description])
     VALUES
           (SYSDATETIMEOFFSET()
           ,NULL
           ,NULL
           ,N'Schronisko dla bezdomnych zwierząt w Poznaniu'
           ,N'Schronisko1'
           ,N'poznan@mail.com'
           ,N'853857294'
           ,N'28374658'
           ,N'Poznań'
           ,N'Poznańska'
           ,N'1'
           ,N'12-758'
           ,N'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
           (SYSDATETIMEOFFSET()
           ,NULL
           ,NULL
           ,N'Schronisko dla bezdomnych zwierząt w Warszawie'
           ,N'Schronisko2'
           ,N'warszawa@mail.com'
           ,N'849837592'
           ,N'12094729'
           ,N'Warszawa'
           ,N'Warszawska'
           ,N'12'
           ,N'54-237'
           ,N'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
           (SYSDATETIMEOFFSET()
           ,NULL
           ,NULL
           ,N'Schronisko dla bezdomnych zwierząt w Krakowie'
           ,N'Schronisko3'
           ,N'krakow@mail.com'
           ,N'749576391'
           ,N'14950394'
           ,N'Kraków'
           ,N'Krakowska'
           ,N'112'
           ,N'93-105'
           ,N'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.')
GO

USE [INZ_DB]
GO

INSERT INTO [dbo].[animals]
           ([created_at]
           ,[updated_at]
           ,[deleted_at]
           ,[animal_type_id]
           ,[breed]
           ,[name]
           ,[shelter_id]
           ,[adoptable]
           ,[description]
           ,[age]
           ,[weight]
           ,[sex]
           ,[admission_date]
           ,[chip_number]
           ,[recently_found]
           ,[is_sterilized]
           ,[is_vaccinated])
     VALUES
           (SYSDATETIMEOFFSET()
           ,NULL
           ,NULL
           ,1
           ,N'mieszaniec'
           ,N'Kajtek'
           ,1
           ,1
           ,N'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
           ,108
           ,10000
           ,N'samiec'
           ,SYSDATETIMEOFFSET()
           ,N'1QAZ2WD4TG7YH3WSX'
           ,1
           ,1
           ,1),
           (SYSDATETIMEOFFSET()
           ,NULL
           ,NULL
           ,2
           ,N'europejska'
           ,N'Sernik'
           ,2
           ,0
           ,N'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
           ,7
           ,3000
           ,N'samiec'
           ,SYSDATETIMEOFFSET()
           ,N'616096700086198'
           ,1
           ,1
           ,1),
           (SYSDATETIMEOFFSET()
           ,NULL
           ,NULL
           ,1
           ,N'owczarek niemiecki'
           ,N'Yanus'
           ,3
           ,1
           ,N'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
           ,36
           ,30000
           ,N'samiec'
           ,SYSDATETIMEOFFSET()
           ,N'NHN73E8EFU8N'
           ,0
           ,1
           ,0),
            (SYSDATETIMEOFFSET()
           ,NULL
           ,NULL
           ,6
           ,N'królik'
           ,N'Puchata'
           ,1
           ,1
           ,N'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
           ,8
           ,1000
           ,N'samica'
           ,SYSDATETIMEOFFSET()
           ,N'D92IDUNED2E'
           ,1
           ,1
           ,0),
            (SYSDATETIMEOFFSET()
           ,NULL
           ,NULL
           ,4 
           ,N'gekon'
           ,N'Albert'
           ,1
           ,1
           ,N'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
           ,11
           ,200
           ,N'samiec'
           ,SYSDATETIMEOFFSET()
           ,N'D92IDUNED2E'
           ,1
           ,1
           ,0),
           (SYSDATETIMEOFFSET()
           ,NULL
           ,NULL
           ,1
           ,N'labrador'
           ,N'Lucy'
           ,2
           ,1
           ,N'Lucy to młoda i aktywna suczka w typie labradora.
Zawsze chętna na spacery, zabawę i kontakt z człowiekiem. Kocha zabawy piłką, jak większość labradorów uwielbia się kąpać - nawet w kałuży! Jak na razie nie zauważyliśmy, by miał negatywne podejście do innych psiaków, ale w przypadku innych zwierząt w domu konieczna będzie wizyta przedadopcyjna.
Szukamy dla niej cierpliwego, aktywnego domu, nastawionego na pracę z psem. Zapraszamy na spacery z Lucy 🙂'
           ,12
           ,16000
           ,N'samica'
           ,SYSDATETIMEOFFSET()
           ,N'D92IDUNED2E'
           ,1
           ,1
           ,0),
           (SYSDATETIMEOFFSET()
           ,NULL
           ,NULL
           ,2
           ,N'europejska'
           ,N'Racuch'
           ,2
           ,0
           ,N'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
           ,7
           ,3000
           ,N'samiec'
           ,SYSDATETIMEOFFSET()
           ,N'616096700086154'
           ,1
           ,1
           ,1),
           (SYSDATETIMEOFFSET()
           ,NULL
           ,NULL
           ,2
           ,N'europejska'
           ,N'Łajka'
           ,2
           ,0
           ,N'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
           ,96
           ,6000
           ,N'samica'
           ,SYSDATETIMEOFFSET()
           ,N'8UJN8UENDJD83'
           ,1
           ,0
           ,1)
GO

USE [INZ_DB]
GO

INSERT INTO [dbo].[users]
           ([created_at]
           ,[updated_at]
           ,[deleted_at]
           ,[password]
           ,[firstname]
           ,[surname]
           ,[email])
     VALUES
           (SYSDATETIMEOFFSET()
           ,NULL
           ,NULL
           ,N'user1'
           ,N'Jan'
           ,N'Kowalski'
           ,N'user1@mail.com'),
           (SYSDATETIMEOFFSET()
           ,NULL
           ,NULL
           ,N'user2'
           ,N'Krzysztof'
           ,N'Nowak'
           ,N'user2@mail.com'),
           (SYSDATETIMEOFFSET()
           ,NULL
           ,NULL
           ,N'user3'
           ,N'Tomasz'
           ,N'Bliski'
           ,N'user3@mail.com')
GO

USE [INZ_DB]
GO

INSERT INTO [dbo].[fav_animals]
           ([animal_id]
           ,[user_id])
     VALUES
           (1
           ,2),
           (2
           ,2),
           (2
           ,1),
           (1
           ,1)
GO

USE [INZ_DB]
GO

INSERT INTO [dbo].[pictures]
           ([created_at]
           ,[updated_at]
           ,[deleted_at]
           ,[animal_id]
           ,[path])
     VALUES
           (SYSDATETIMEOFFSET()
           ,NULL
           ,NULL
           ,0
           ,N'000_001'),
           (SYSDATETIMEOFFSET()
           ,NULL
           ,NULL
           ,1
           ,N'000_001'),
           (SYSDATETIMEOFFSET()
           ,NULL
           ,NULL
           ,2
           ,N'001_001'),
           (SYSDATETIMEOFFSET()
           ,NULL
           ,NULL
           ,3
           ,N'002_001'),
           (SYSDATETIMEOFFSET()
           ,NULL
           ,NULL
           ,4
           ,NULL)
GO
