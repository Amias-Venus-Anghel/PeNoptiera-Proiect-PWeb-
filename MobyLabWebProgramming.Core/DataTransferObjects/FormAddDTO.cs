using MobyLabWebProgramming.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class FormAddDTO
{
    public FormSubjectEnum Subject { get; set; }
    public string Body { get; set; }
    public float Rating { get; set; }
}

