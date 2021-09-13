using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.AdresaF
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Emri { get; set; }
            public string Mbiemri { get; set; }
            public int? NrTelefonit { get; set; }
            public int? NrTelefonit2 { get; set; }
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
                var adresaF = await _context.AdresaF.FindAsync(request.Id);

                if (adresaF == null)
                    throw new Exception("Could not find an AdresaF");

                adresaF.Emri = request.Emri ?? adresaF.Emri;
                adresaF.Mbiemri = request.Mbiemri ?? adresaF.Mbiemri;
                adresaF.NrTelefonit = request.NrTelefonit ?? adresaF.NrTelefonit;
                adresaF.NrTelefonit2 = request.NrTelefonit2 ?? adresaF.NrTelefonit2;
                adresaF.Adrersa = request.Adrersa ?? adresaF.Adrersa;
                adresaF.Adresa2 = request.Adresa2 ?? adresaF.Adresa2;
                adresaF.Qyteti = request.Qyteti ?? adresaF.Qyteti;
                adresaF.Shteti = request.Shteti ?? adresaF.Shteti;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}