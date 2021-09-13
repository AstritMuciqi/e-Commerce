using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.AdresaF
{
    public class Details
    {
        public class Query : IRequest<AdresaFaturimit>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, AdresaFaturimit>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<AdresaFaturimit> Handle(Query request, CancellationToken cancellationToken)
            {
                var adresaF = await _context.AdresaF.FindAsync(request.Id);

                return adresaF;
            }
        }
    }
}