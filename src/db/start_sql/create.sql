-- public."Forms" definition

-- Drop table

-- DROP TABLE public."Forms";

CREATE TABLE public."Forms" (
	id text NOT NULL,
	"name" varchar(100) NOT NULL,
	phone varchar(13) NOT NULL,
	message text NOT NULL,
	CONSTRAINT "Forms_pkey" PRIMARY KEY (id)
);


-- public."Permission" definition

-- Drop table

-- DROP TABLE public."Permission";

CREATE TABLE public."Permission" (
	id text NOT NULL,
	"name" varchar(100) NOT NULL,
	description varchar(255) NOT NULL,
	updated_at timestamp(3) NOT NULL,
	created_date timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "Permission_pkey" PRIMARY KEY (id)
);


-- public."Role" definition

-- Drop table

-- DROP TABLE public."Role";

CREATE TABLE public."Role" (
	id text NOT NULL,
	"name" varchar(100) NOT NULL,
	description varchar(255) NOT NULL,
	created_date timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp(3) NOT NULL,
	CONSTRAINT "Role_pkey" PRIMARY KEY (id)
);


-- public."PermissionOnRoles" definition

-- Drop table

-- DROP TABLE public."PermissionOnRoles";

CREATE TABLE public."PermissionOnRoles" (
	role_id text NOT NULL,
	permission_id text NOT NULL,
	assigned_at timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp(3) NOT NULL,
	CONSTRAINT "PermissionOnRoles_pkey" PRIMARY KEY (role_id, permission_id),
	CONSTRAINT "PermissionOnRoles_permission_id_fkey" FOREIGN KEY (permission_id) REFERENCES public."Permission"(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	CONSTRAINT "PermissionOnRoles_role_id_fkey" FOREIGN KEY (role_id) REFERENCES public."Role"(id) ON DELETE RESTRICT ON UPDATE CASCADE
);


-- public."User" definition

-- Drop table

-- DROP TABLE public."User";

CREATE TABLE public."User" (
	id text NOT NULL,
	email varchar(60) NOT NULL,
	updated_at timestamp(3) NOT NULL,
	"password" varchar(200) NOT NULL,
	active bool NOT NULL DEFAULT false,
	created_date timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	activation_code bpchar(6) NULL,
	login_code bpchar(6) NULL,
	role_id text NOT NULL,
	CONSTRAINT "User_pkey" PRIMARY KEY (id),
	CONSTRAINT "User_role_id_fkey" FOREIGN KEY (role_id) REFERENCES public."Role"(id) ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);