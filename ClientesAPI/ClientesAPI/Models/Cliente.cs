
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClientesAPI.Models
{
    [Table("clientes")]
    public class Cliente
    {
        [Key]
        public int Id_cliente { get; set; }

        // CUI: exactamente 13 números
        [Required(ErrorMessage = "El CUI es obligatorio.")]
        [RegularExpression(@"^[0-9]{13}$",
            ErrorMessage = "El CUI debe contener exactamente 13 números.")]
        public string CUI { get; set; } = string.Empty;

        // NIT: obligatorio, máximo 15 caracteres
        [Required(ErrorMessage = "El NIT es obligatorio.")]
        [StringLength(15,
            ErrorMessage = "El NIT no puede superar los 15 caracteres.")]
        public string NIT { get; set; } = string.Empty;

        // Nombres: obligatorios
        [Required(ErrorMessage = "Los nombres son obligatorios.")]
        [StringLength(100,
            ErrorMessage = "Los nombres no pueden superar los 100 caracteres.")]
        public string Nombres { get; set; } = string.Empty;

        // Apellidos: obligatorios
        [Required(ErrorMessage = "Los apellidos son obligatorios.")]
        [StringLength(100,
            ErrorMessage = "Los apellidos no pueden superar los 100 caracteres.")]
        public string Apellidos { get; set; } = string.Empty;

        // Dirección: opcional
        [StringLength(200,
            ErrorMessage = "La dirección no puede superar los 200 caracteres.")]
        public string? Direccion { get; set; }

        // Teléfono: opcional, exactamente 8 números si se proporciona
        [RegularExpression(@"^[0-9]{8}$",
            ErrorMessage = "El teléfono debe contener exactamente 8 números.")]
        public string? Telefono { get; set; }

        // Fecha de nacimiento: obligatoria y no futura
        [Required(ErrorMessage = "La fecha de nacimiento es obligatoria.")]
        [DataType(DataType.Date)]
        [FechaNoFutura]
        public DateTime Fecha_Nacimiento { get; set; }
    }

    // Validación personalizada de fecha
    public class FechaNoFuturaAttribute : ValidationAttribute
    {
        public FechaNoFuturaAttribute()
        {
            ErrorMessage = "La fecha de nacimiento no puede ser futura.";
        }

        protected override ValidationResult? IsValid(
            object? value,
            ValidationContext validationContext)
        {
            if (value is DateTime fecha)
            {
                if (fecha.Date > DateTime.Today)
                {
                    return new ValidationResult(ErrorMessage);
                }
            }

            return ValidationResult.Success;
        }
    }
}
