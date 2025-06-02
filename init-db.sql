CREATE DATABASE MinisterioPublicoDB;
USE MinisterioPublicoDB;

CREATE TABLE Fiscalia (
    id_fiscalia INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(100) NOT NULL,
    ubicacion NVARCHAR(200)
);

CREATE TABLE Fiscal (
    id_fiscal INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(100) NOT NULL,
    correo NVARCHAR(100) NOT NULL UNIQUE,
    id_fiscalia INT NOT NULL,
    FOREIGN KEY (id_fiscalia) REFERENCES Fiscalia(id_fiscalia)
);

CREATE TABLE Usuario (
    id_usuario INT PRIMARY KEY IDENTITY(1,1),
    username NVARCHAR(50) NOT NULL UNIQUE,
    password_hash NVARCHAR(255) NOT NULL,
    id_fiscal INT NOT NULL,
    rol NVARCHAR(30) NOT NULL DEFAULT 'fiscal',
    FOREIGN KEY (id_fiscal) REFERENCES Fiscal(id_fiscal)
);

CREATE TABLE Estado_Caso (
    id_estado INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(50) NOT NULL
);

CREATE TABLE Caso (
    id_caso INT PRIMARY KEY IDENTITY(1,1),
    titulo NVARCHAR(200) NOT NULL,
    descripcion NVARCHAR(MAX),
    fecha_creacion DATETIME NOT NULL DEFAULT GETDATE(),
    id_estado INT NOT NULL,
    id_fiscal INT NOT NULL,
    id_fiscalia INT NOT NULL,
    FOREIGN KEY (id_estado) REFERENCES Estado_Caso(id_estado),
    FOREIGN KEY (id_fiscal) REFERENCES Fiscal(id_fiscal),
    FOREIGN KEY (id_fiscalia) REFERENCES Fiscalia(id_fiscalia)
);

CREATE TABLE Bitacora_Log (
    id_log INT PRIMARY KEY IDENTITY(1,1),
    id_caso INT NOT NULL,
    id_fiscal_anterior INT NOT NULL,
    id_fiscal_nuevo INT NOT NULL,
    fecha_intento DATETIME NOT NULL DEFAULT GETDATE(),
    motivo NVARCHAR(255),
    FOREIGN KEY (id_caso) REFERENCES Caso(id_caso),
    FOREIGN KEY (id_fiscal_anterior) REFERENCES Fiscal(id_fiscal),
    FOREIGN KEY (id_fiscal_nuevo) REFERENCES Fiscal(id_fiscal)
);

INSERT INTO Fiscalia (nombre, ubicacion) VALUES
('Fiscalía Centro', 'Ciudad Capital'),
('Fiscalía Norte', 'Ciudad Norte'),
('Fiscalía Sur', 'Ciudad Sur');

INSERT INTO Estado_Caso (nombre) VALUES ('pendiente'), ('en proceso'), ('cerrado');

INSERT INTO Fiscal (nombre, correo, id_fiscalia) VALUES
('Juan Pérez', 'juan.perez@ejemplo.com', 1),
('Ana López', 'ana.lopez@ejemplo.com', 2),
('Carlos Ruiz', 'carlos.ruiz@ejemplo.com', 1);

INSERT INTO Usuario (username, password_hash, id_fiscal, rol) VALUES
('juanp', '$2b$10$xLqTXuRc.LGTqfEavbeRXuf1YZ3a1lKRrnqyvxRwUiYcnivA/GnHi', 1, 'jefe'),
('ana', '$2b$10$SXyDg55yyh2VDYekhh3I.e6bFztHVzphU2esJd8qo1z.gbMBRP3UG', 2, 'fiscal'),
('carlosr', '$2b$10$YRauQP.6kQcNg688Pc6pVOQlbQFRH7Cm09gqtVGSwerE3s1dqXSgC', 3, 'fiscal');

INSERT INTO Caso (titulo, descripcion, id_estado, id_fiscal, id_fiscalia)
VALUES
('Robo en supermercado', 'Se reporta un robo a mano armada...', 1, 1, 1),
('Fraude bancario', 'Investigación sobre fraude en banco...', 2, 2, 2),
('Lesiones personales', 'Caso de lesiones en vía pública...', 1, 3, 1);

INSERT INTO Bitacora_Log (id_caso, id_fiscal_anterior, id_fiscal_nuevo, motivo)
VALUES (1, 1, 2, 'Intento de reasignación a fiscal de otra fiscalía');