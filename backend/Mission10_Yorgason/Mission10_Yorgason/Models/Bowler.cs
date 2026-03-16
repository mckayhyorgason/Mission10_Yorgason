using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Mission10_Yorgason.Models;

public partial class Bowler
{
    [Key]
    [Required]
    public int BowlerId { get; set; }
    [Required]

    public string BowlerLastName { get; set; }
    [Required]

    public string BowlerFirstName { get; set; }

    public string BowlerMiddleInit { get; set; }
    [Required]

    public string BowlerAddress { get; set; }
    [Required]

    public string BowlerCity { get; set; }
    [Required]

    public string BowlerState { get; set; }
    [Required]

    public string BowlerZip { get; set; }
    [Required]

    public string BowlerPhoneNumber { get; set; }

    public int? TeamId { get; set; }

    public virtual ICollection<BowlerScore> BowlerScores { get; set; } = new List<BowlerScore>();

    public virtual Team? Team { get; set; }
}
