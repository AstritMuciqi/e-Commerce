using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.AdresaF
{
    public class Delete
    {
        public class Command : IRequest
        {
           public Guid Id { get; set; }
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

              if(adresaF == null )
              throw new Exception("Nuk u gjet kjo adrese e faturimit");

              _context.Remove(adresaF);


                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}