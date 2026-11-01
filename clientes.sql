
CREATE DATABASE clientes;
GO

USE clientes;
GO

CREATE TABLE dbo.clientes (
    Id_cliente INT IDENTITY(1,1) PRIMARY KEY,
    CUI NVARCHAR(20) NOT NULL,
    NIT NVARCHAR(15) NOT NULL,
    Nombres NVARCHAR(100) NOT NULL,
    Apellidos NVARCHAR(100) NOT NULL,
    Direccion NVARCHAR(200) NULL,
    Telefono NVARCHAR(20) NULL,
    Fecha_Nacimiento DATETIME2 NOT NULL
);
GO

INSERT INTO dbo.clientes
(CUI, NIT, Nombres, Apellidos, Direccion, Telefono, Fecha_Nacimiento)
VALUES
('1234567890101', '1234567-8', 'Juan', 'Perez',
 'Ciudad de Guatemala', '55551234', '2000-05-15'),

('1234567890102', '8765432-1', 'Maria', 'Lopez',
 'Mixco, Guatemala', '55556789', '1999-08-20');
GO

SELECT * FROM dbo.clientes;

