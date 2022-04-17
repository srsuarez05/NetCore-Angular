using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Document
    {
        public int DocumentId { get; set; }
        public string DocumentFile {get; set; }
        public string DocumentState { get; set; }

        public string DocumentDate { get; set; }

        public string  UserName { get; set; }
    }
}
