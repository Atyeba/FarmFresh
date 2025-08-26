import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let query = 'SELECT * FROM products WHERE stock_quantity > 0';
    let params = [];
    
    if (category) {
      query += ' AND category = $1';
      params.push(category);
    }
    
    query += ' ORDER BY category, name';
    
    const products = await sql(query, params);
    
    return Response.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return Response.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, description, price, unit, category, emoji, stock_quantity } = body;
    
    // Validate required fields
    if (!name || !description || !price || !unit || !category || !emoji) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const result = await sql`
      INSERT INTO products (name, description, price, unit, category, emoji, stock_quantity)
      VALUES (${name}, ${description}, ${price}, ${unit}, ${category}, ${emoji}, ${stock_quantity || 0})
      RETURNING *
    `;
    
    return Response.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return Response.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}