using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AdresaF
{
    public class List
    {
        public class Query : IRequest<List<AdresaFaturimit>> { }

        public class Handler : IRequestHandler<Query, List<AdresaFaturimit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<AdresaFaturimit>> Handle(Query request,
             CancellationToken cancellationToken)
            {
                var adresaF = await _context.AdresaF.ToListAsync();

                return adresaF;
            }
        }
    }
}