using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.AdresaF
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Emri { get; set; }
            public string Mbiemri { get; set; }
            public int NrTelefonit { get; set; }
            public int NrTelefonit2 { get; set; }
            public string Adrersa { get; set; }
            public string Adresa2 { get; set; }
            public string Qyteti { get; set; }
            public string Shteti { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
               _context = context;
            }

            public async Task<Unit> Handle(Command request,
             CancellationToken cancellationToken)
            {
                var adresaF = new AdresaFaturimit
                {
                    Id = request.Id,
                    Emri = request.Emri,
                    Mbiemri = request.Mbiemri,
                    NrTelefonit=request.NrTelefonit,
                    NrTelefonit2=request.NrTelefonit2,
                    Adrersa=request.Adrersa,
                    Adresa2=request.Adresa2,
                    Qyteti=request.Qyteti,
                    Shteti=request.Shteti
                };

                _context.AdresaF.Add(adresaF);
               var success = await _context.SaveChangesAsync() > 0;

               if(success) return Unit.Value;

               throw new Exception("Problem saving changes");
            }
        }
    }
}